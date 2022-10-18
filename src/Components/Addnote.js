import styled from "styled-components";

const Form = styled.form`
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
`;

const Input = styled.input`
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

const Textarea = styled.textarea`
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

const Button = styled.button`
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

const Addnote = ({ handleaddNoteSubmit, handleaddNoteChange  }) => {
    
    return ( 
        <Form onSubmit={handleaddNoteSubmit}>
            <h2>Create New Note</h2>
            <Input
                type="text"
                id="newnote"
                name="heading"
                required="required"
                placeholder="Subject"
                onChange={handleaddNoteChange}
            />
            <Textarea 
                id="content"
                name="content" 
                placeholder="Content"
                onChange={handleaddNoteChange}
            />
            <Button>
                Add New
            </Button>
        </Form>
     );
}
 
export default Addnote;