import { useEffect, useState } from 'react';
import './App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Parser from 'html-react-parser';
import Axios from 'axios';


function App() {
  const [movieContent, setMovieCotent] = useState({
    title:'',
    content:''
  })

  const [viewContent, setViewContent] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:8000/api/get').then((response)=>{
      //console.log(response);
      setViewContent(response.data);
    });
  },[])

  const submitReview = ()=>{
    var title = movieContent.title; 
    var content = movieContent.content;  
    content  = content.replace(/<[^>]*>?/g, ''); //html 태그 제거

    Axios.post('http://localhost:8000/api/insert', {
      title: title,
      content: content
    }).then(()=>{
      alert('등록완료!');
    })
  };

  const getValue = e => {
    const { name, value } = e.target;
    setMovieCotent({
      ...movieContent,
      [name]: value
    })
  }

  return (
    <div className="App">
      <h1>Movie Review</h1>
      <div className='movie-container'>
        {viewContent.map(element =>
          <div>
            <h2>{element.title}</h2>
            <div>
              {Parser(element.content)}
            </div>
          </div>
        )}
      </div>
      <div className='form-wrapper'>
        <input className="title-input" type='text' placeholder='제목' onChange={getValue} name='title'/>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            //console.log({ event, editor, data });
            setMovieCotent({
              ...movieContent,
              content:data
            })
            //console.log(movieContent);
          }}
          onBlur={(event, editor) => {
            //console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            //console.log('Focus.', editor);
          }}
        />
      </div>
      <button className="submit-button"
        onClick={submitReview}
        >입력</button>
    </div>
  );
}

export default App;