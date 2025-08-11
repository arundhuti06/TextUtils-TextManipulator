import React, { useState } from 'react'

export default function TextForm(props) {

    const [text, setText] = useState('');

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("converted to uppercase", "success");
    }
    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("converted to lowercase", "success");
    }
    const handleFirstLetterUpClick = () => {
        const word = text.split(" ");
        for (let i = 0; i < word.length; i++) {
            word[i] = word[i].charAt(0).toUpperCase() + word[i].slice(1);
        }
        const newText = word.join(" ");
        setText(newText);
        props.showAlert("Capitalized each first letter", "success");
    }
    const handleTextToSpeakClick = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Text to Speach enabled", "success");
    }
    const handleCapitalizeSentenceClick = () => {
        const sentences = text.split('. ');
        sentences.forEach((sentence, index) => {
            sentences[index] = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        });
        const newText = sentences.join('. ');
        setText(newText);
        props.showAlert("Each Sentence Capitalised", "success");
    }
    const handleExtraSpaceClick = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Removed extra spaces", "success");
    }
    const handleClearClick = () => {
        let newText = "";
        setText(newText);
        props.showAlert("Cleared text", "success");
    }
    const handleCopyClick = () => {
        var text = document.getElementById("textbox");
        text.select();
        navigator.clipboard.writeText(text.value);
        document.getSelection().removeAllRanges();
        props.showAlert("text copied to clipboard", "success");
    }

    const handleOnChange = (event) => {
        setText(event.target.value);
    }

    const wordCount = (text) => {
        const trimmedString = text.trim();
        if (trimmedString === "") {
            return 0;
        }else{
            return trimmedString.split(/\s+/).length;
        }
    }


    return (
        <>
            <div className="container">
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" placeholder='Enter text here' value={text} onChange={handleOnChange} id="textbox" rows="8" style={{ backgroundColor: props.mode === 'light' ? 'white' : '#1b1b1bff', color: props.mode === 'light' ? 'black' : 'white' }}></textarea>
                </div>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleFirstLetterUpClick}>Words First Letter Uppercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleTextToSpeakClick}>Text to Speak</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCapitalizeSentenceClick}>Capitalize Sentence</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaceClick}>Remove Extra Spaces</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopyClick}>Copy Text</button>
            </div>
            <div className="container my-3" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
                <h2>Your text summary</h2>
                <p>{wordCount(text)} Words, {text.length} characters</p>
                <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} minuites read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Nothing to preview !"}</p>
            </div>
        </>
    );
}
