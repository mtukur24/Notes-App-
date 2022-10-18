import { useState } from "react";
import styled from "styled-components";
import { MdDelete, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";


const Div = styled.div`
    display: flex;
    justify-content: space-between;
`;

const NoteDiv = styled.div`
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;

    &:hover {
        background: ${(props) => props.theme.noteshover};
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
        margin: 2px;
        border-radius: 2mm;
    }
`;

const CloseButton = styled(MdDelete)`
    color: red;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 15px;
    margin-top: 10px;
    cursor: pointer;
    height: 30px;
    width: 20px;
`;

const H3 = styled.h3`
    cursor: pointer;

    &:hover {
        /* background-color: grey; */
        width: 450px;
    }
`;

const Section = styled.section`
    margin-left: 30px;
    margin-right: 30px;
`;

const Input = styled.input`
    display: block;
    padding: 6px 10px;
    margin: 20px 0;
    border: 1px solid grey;
    box-sizing: border-box;
    font: 1em sans-serif;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};

    @media screen and (max-width: 40em) {
        display: block;
        width: 40%;
        padding: 6px 10px;
        margin: 20px 0;
        border: 1px solid grey;
        box-sizing: border-box;
        font: 12px sans-serif;
        
    }
`;

const NotesLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    color: ${(props) => props.theme.color};
`;

const Notes = ({ notes, deleteNote }) => {
    const [searchnotes, setsearchNotes] = useState('');

    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

    return ( 
        <Section>
            <Div>
                <h2>My Notes</h2>
                <Input 
                    type='text' 
                    placeholder="Search..." 
                    onChange={(e) => {setsearchNotes(e.target.value)}} 
                />
            </Div>
            <div>
                {sortedNotes.filter((note) => {
                    if (searchnotes === "") {
                        return note
                    } else if (note.heading.toLowerCase().includes(searchnotes.toLowerCase()) || note.content.toLowerCase().includes(searchnotes.toLowerCase()) ) {
                        return note
                    }
                    return false;
                }).map((note) => {
                    return (
                        <NoteDiv key={note.id} >
                            <Div>
                                <NotesLink to={`/notes/${note.id}`} >
                                    <H3>{ note.heading}</H3> 
                                </NotesLink>
                                <CloseButton 
                                    onClick={()=> deleteNote(note.id)}
                                />
                            </Div>
                            <NotesLink to={`/notes/${note.id}`} >
                                <Div>
                                    <small>{note.content? note.content.substr(0, 30) + "..." : 'No content to display'} </small>
                                    <small>{new Date(note.lastModified).toLocaleDateString("en-NG", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                        }) }
                                    </small>
                                </Div>
                            </NotesLink>
                        </NoteDiv>
                    )}
                )}
            </div>
        </Section>
     );
}
 
export default Notes;