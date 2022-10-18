import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineArrowBackIosNew, MdEdit } from "react-icons/md";
import { useState } from "react";


const Div = styled.div`
    padding: 40px;
    margin-top: -50px;
`;

const Divtop = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 30px;
`;

const Backarrow = styled(MdOutlineArrowBackIosNew)`
  margin-bottom: -2px; 
`;

const EditIcon = styled(MdEdit)`
  margin-bottom: -2px; 
`;

const Button = styled.button`
  background: ${(props) => props.theme.background};
  border: none;
  color: grey;
  cursor: pointer;
  font-size: 15px;
  margin: 0px;
  

  /* &:hover {
    background: ${(props) => props.theme.buttonhover};
    border-radius: 2mm;
  } */
`;

const Footer = styled.footer`
    padding-top: 60px;
    font-size: 12px;
`;

const EditForm = styled.form`
    /* max-width: 400px; */
    /* margin: 0 auto;
    text-align: center; */
`;

const EditInput = styled.input`
    width: 100%;
    display: block;
    padding: 6px 10px;
    margin: 10px 0;
    border: 0.3px solid #ddd;
    box-sizing: border-box;
    font: 1em sans-serif;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
`;

const EditTextarea = styled.textarea`
    width: 100%;
    display: block;
    padding: 6px 10px;
    margin: 10px 0;
    border: 0.3px solid #ddd;
    box-sizing: border-box;
    height: 5em;
    font: 1em sans-serif;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
`;

const Editbutton = styled.button`
    background: ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.buttontxtColor};
    border: none;
    border-radius: 2mm;
    cursor: pointer;
    width: 30%;
    padding: 5px;
    font-size: large;

    &:hover {
        background: ${(props) => props.theme.buttonhover};
        border-radius: 2mm;
  }
`;

const NotesDetails = ({ notes, setNotes }) => {
    const { id } = useParams();
    const note = notes.find(item => item.id === id);

    const [isEditing, setIsEditing] = useState(false);

    const [editNotedata, setEditNotedata] = useState({
        heading: '',
        content: '',
        lastModified: Date.now()
    });

    const handleEditNoteChange = (e) => {
        e.preventDefault();
    
        const inptName = e.target.getAttribute('name');
        const inptValue = e.target.value;
    
        const newNotedata = { ...editNotedata };
        newNotedata[inptName] = inptValue;
        setEditNotedata(newNotedata);
    };

    const handleEditClick = (e) => {
        e.preventDefault();
        setIsEditing(true);

        const EditNotevalues = {
            heading: note.heading,
            content: note.content,
        };

        setEditNotedata(EditNotevalues);
    }

    const handleEditNoteSubmit = (e) => {
        e.preventDefault();

        const editedNote = {
            id: note.id,
            heading: editNotedata.heading,
            content: editNotedata.content,
            lastModified: Date.now()
        }

        const newNotes = [...notes];
        const index = notes.findIndex( (item) => item.id === editedNote.id);
        newNotes[index] = editedNote;

        setNotes(newNotes);
        setIsEditing(false);
    }

    const ViewNotes = (
        <>
            <Divtop>
                <Link to="/">
                    <Button><Backarrow /> Notes</Button>
                </Link>
                <Button onClick={handleEditClick}><EditIcon/> Edit</Button>
            </Divtop>
            <Div>
                <h2> {note.heading} </h2>
                <p> {note.content} </p>
                <Footer> Last modified - {''}
                    {new Date(note.lastModified).toLocaleDateString("en-NG", {
                        hour: "2-digit",
                        minute: "2-digit"
                    }) } 
                </Footer>
            </Div>
        </>
    );

    const EditableNotes = (
        <>
              
            <EditForm onSubmit={handleEditNoteSubmit}>
                <Divtop>
                    <Button type="button" onClick={() => setIsEditing(false)}> Cancel </Button>
                    <Button type="submit">Done</Button>
                </Divtop>
                <Div>
                <EditInput
                    type="text"
                    id="newnote"
                    name="heading"
                    required="required"
                    value={editNotedata.heading}
                    onChange={handleEditNoteChange}
                />
                <EditTextarea 
                    id="content"
                    name="content" 
                    value={editNotedata.content}
                    onChange={handleEditNoteChange}
                />
                </Div>
            </EditForm>
        </>
    );


    return ( 
        <div>
            { isEditing ? EditableNotes : ViewNotes }
        </div>
     );
}
 
export default NotesDetails;