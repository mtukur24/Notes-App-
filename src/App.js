import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Addnote from "./Components/Addnote";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Notes from "./Components/Notes";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import NotesDetails from "./Components/NotesDetails";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background: ${(props) => props.theme.body};
  }

`;

const Div = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  margin: 100px 100px 100px 100px; 
  padding: 20px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 40em) {
    background: ${(props) => props.theme.background};
    margin: 0px 0px 0px 0px;
    padding: 20px;
    box-shadow: none;
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.background};
  border: none;
  color: grey;
  cursor: pointer;
  font-size: 15px;
  margin-right: 5px;

  &:hover {
    background: ${(props) => props.theme.buttonhover};
    border-radius: 2mm;
  }
  
`;

const Btndiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 25px;
  margin-top: -30px;
`;

const Lightmode = styled(MdOutlineLightMode)`
  margin-bottom: -2px; 
`;

const Darkmode = styled(MdDarkMode)`
  margin-bottom: -2px; 
`;

const lightTheme = {
  body: 'white',
  background: 'white',
  color: 'black',
  buttonColor: 'white',
  buttontxtColor: 'grey',
  buttonhover: 'rgb(217, 217, 217)',
  noteshover: 'rgb(242, 242, 242)'
}

const darkTheme = {
  body: 'rgb(64, 64, 64)',
  background: 'rgb(38, 38, 38)',
  color: 'white',
  buttonColor: 'rgb(38, 38, 38)',
  buttontxtColor: 'grey',
  buttonhover: 'rgb(64, 64, 64)',
  noteshover: 'rgb(51, 51, 51)'
}

function App() {

  const loadedNotes = localStorage.getItem("notesapp")? JSON.parse(localStorage.getItem("notesapp")) : [];

  const [notes, setNotes] = useState(loadedNotes);

  useEffect(() => {
    window.localStorage.setItem("notesapp", JSON.stringify(notes));
  }, [notes]);

  const [addNotedata, setaddNotedata] = useState({
    heading:'', 
    content:'',
    lastModified: Date.now()
  });
  

  const handleaddNoteChange = (e) => {
    e.preventDefault();

    const inptName = e.target.getAttribute('name');
    const inptValue = e.target.value;

    const newNotedata = { ...addNotedata };
    newNotedata[inptName] = inptValue;
    setaddNotedata(newNotedata);
  };


  const handleaddNoteSubmit = (e) => {
    e.preventDefault();

    const newNote = {
        id: nanoid(),
        heading: addNotedata.heading,
        content: addNotedata.content,
        lastModified: Date.now()
    }

    const newNotes = [ newNote, ...notes ];
    setNotes(newNotes);
    
    e.target.reset();
  }

  const deleteNote = (id) => {
    const remainingNotes = notes.filter( note => id !== note.id );
    setNotes( remainingNotes );
  }

  const loadedBackground = localStorage.getItem("backgroundTheme")? JSON.parse(localStorage.getItem("backgroundTheme")) : [];

  const [theme, setTheme] = useState(loadedBackground);

  useEffect(() => {
    window.localStorage.setItem("backgroundTheme", JSON.stringify(theme))
  }, [theme])

  const isdarkTheme = theme === 'dark';
  
  const themeToggle = () => {
    setTheme(isdarkTheme ? 'light' : 'dark')
  }

  return (
    <ThemeProvider theme={isdarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Div>
        <Router>
          <div>
            <Navbar />
            <Btndiv>
              <Button onClick={themeToggle}> {isdarkTheme ? <Lightmode /> : <Darkmode />} Theme </Button>
            </Btndiv>
            <Switch>
              <Route exact path="/">
                <Notes notes={notes} deleteNote={deleteNote} />
              </Route>
              <Route path="/addnote">
                <Addnote handleaddNoteChange={handleaddNoteChange} handleaddNoteSubmit={handleaddNoteSubmit}   />
              </Route>
              <Route path="/notes/:id">
                <NotesDetails notes={notes} setNotes={setNotes} />
              </Route>
            </Switch>
          </div>
        </Router>
      </Div>
    </ThemeProvider>
  );
}

export default App;
