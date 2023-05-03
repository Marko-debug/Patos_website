import { Dispatch, SetStateAction, Component} from "react";
import { onChange } from './utilities/utils';
import { SaveButton } from "./buttons/SaveButton";
import { EditButton } from "./buttons/EditButton";
import { DeleteButton } from "./buttons/DeleteButton";
import { CancelButtonPostArticle, CancelButton } from "./buttons/CancelButtonPostArticle";
import { UpdateButton } from "./buttons/UpdateButton";
import { MyGallery }  from "./MyGallery";
import { timeSince } from "./countingTime"
import { TypeNotes } from "./utilities/InterfacesAndTypes";

interface PropsArticle{
    update: boolean;
    id: string,
    side: string, 
    title: {name: string, value: string},
    content: {name: string, value: string},
    published: number;
    // notes: TypeNotes[],
    data: any
    // setData: () => void;
    setData: Dispatch<SetStateAction<[]>>;
    deleteNote: (id: string) => void;
    cancelArticle: () => void;  // to the setState is not sending params, so we need to type it
}

interface StateArticle{
    id: string,
    side: string, 
    title: {name: string, value: string},
    content: {name: string, value: string},
    areInputsVisible: boolean,
    cancelArticle: () => void; // to the setState is not sending params, so we need to type it
}

// export const Article = ({id, side, title, text}: PropsArticle) => {
export class Article extends Component<PropsArticle, StateArticle> {

    constructor(props: PropsArticle){
        super(props);

        // this.nameField = React.createRef();

        //this is option when it would be declare here instead of example below
        // this.state = {
        //     id: this.props.id,
        //     side: this.props.side,
        //     title: this.props.title, 
        //     text: this.props.text 
        // };
    }

    state: StateArticle = {
        id: this.props.id,
        side: this.props.side,
        title: this.props.title, 
        content: this.props.content, 
        areInputsVisible: false,
        cancelArticle: this.props.cancelArticle,
    };
    published = timeSince(this.props.published);

    onChange = (event: any) => {
        let name = event.target.name;
        // let attribute = undefined;
        let value = event.target.value;
        if(name === "text")name = 'content';

        onChange(this, name, value)
    }

    showInputs = (props: boolean): any => {
        // useApiPost('http://localhost:8000/api/notes',this.props.text);
        this.setState({areInputsVisible: props})
    }

      // This function is called when the input changes
    inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setInputHeight(event, '400px'); it doesnt exist
        this.onChange(event); 
    };

    render(){
        const { id, side, title, content, areInputsVisible } = this.state;
        return(
            <div id={id} className={side}>
                <div className="bubble-m">
                    <div className="edit-buttons">
                        { this.props.update ?
                            <UpdateButton 
                                showInputs={this.showInputs} 
                                id={id} 
                                title={title.value} 
                                content={content.value}/>
                            : 
                            <SaveButton 
                                showInputs={this.showInputs} 
                                id={id} 
                                title={title.value} 
                                content={content.value} 
                                // getData={this.props.setData}
                                />
                        }
                        { areInputsVisible
                            ? 
                            <CancelButton showInputs={this.showInputs} />
                            :
                            <>
                                <EditButton 
                                    showInputs={this.showInputs} 
                                    cancelArticle={this.state.cancelArticle} />
                                <DeleteButton 
                                    id={id} 
                                    data={this.props.data} 
                                    setData={this.props.setData}
                                    deleteNote={this.props.deleteNote}
                                />
                            </>
                        }
                    </div>
                    <div className="bubble">
                        <div className="content-title">
                            {areInputsVisible ?

                                <textarea
                                name={title.name}
                                value={title.value}
                                onChange={this.onChange}
                                className="content-title-input"
                                rows={2}
                                placeholder="Vložte nadpis..." /> : `${title.value}`

                                // <input 
                                //     // name={title.name}
                                //     name={title.name}
                                //     value={title.value}
                                //     onChange={this.onChange}
                                //     className="content-title-input"
                                //     type="text" 
                                //     contentEditable="true" 
                                //     placeholder="Vložte nadpis..."/> : `${title.value}`
                            }
                        </div>
                        <div className="article-content">
                            {areInputsVisible ? 

                                <textarea
                                    name={content.name}
                                    value={content.value}
                                    onChange={this.onChange}
                                    className="article-content-input"
                                    rows={10}
                                    cols={55}
                                    placeholder="Vložte text..." /> : `${content.value}`
                            }
                        </div>
                        <div>
                            <MyGallery areInputsVisible={this.state.areInputsVisible}/>
                        
                            <div className="dots-mapping">
                                <span className="dot" ></span> 
                                <span className="dot" ></span> 
                                <span className="dot" ></span> 
                            </div>

                        {/*timer when the post was published */}
                        </div>
                            { this.props.published !== 0 ? 
                                <div className="published"> 
                                    {this.published}
                                </div>
                                : null
                            }
                    </div>
                </div>
            </div>
        )
    }
}