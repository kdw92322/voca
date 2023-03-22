import { useEffect, useState } from 'react';
import './App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Parser from 'html-react-parser';
import Axios from 'axios';

function App() {
  const [movieContent, setMovieCotent] = useState({
    idx: '',
    title:'',
    content:''
  })

  const [viewContent, setViewContent] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:8000/api/get').then((response)=>{
      setViewContent(response.data);
    });
  },[viewContent])

  const submitReview = ()=>{
    var idx = movieContent.idx;
    var title = movieContent.title; 
    var content = movieContent.content;  
    content  = content.replace(/<[^>]*>?/g, ''); //html 태그 제거

    Axios.post('http://localhost:8000/api/insert', {
      idx: idx,
      title: title,
      content: content
    }).then(()=>{
      alert('등록완료!');
      console.log(viewContent);
    })
  };

  const updateReview = (idx)=>{
    var title = movieContent.title; 
    var content = movieContent.content;

    content = content.replace(/<[^>]*>?/g, ''); //html 태그 제거
 
    Axios.post('http://localhost:8000/api/update', {
       idx: idx,
       title: title,
       content: content
    }).then(()=>{
       alert('수정완료!');
    })
  };

  const deleteReview = (idx)=>{
    var title = movieContent.title; 
    var content = movieContent.content;  
    content  = content.replace(/<[^>]*>?/g, ''); //html 태그 제거

    Axios.post('http://localhost:8000/api/delete', {
      idx: idx,
      title: title,
      content: content
    }).then(()=>{
      alert('삭제완료!');
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
          <div key={element.idx}>
            <input className="textTitle" type="text" id="title" name="title" onChange={getValue} defaultValue={element.title}/>
            <div>
              <input type="hidden" id="idx" name="idx" defaultValue={element.idx}/>
              <input className="textContent" type="text" id="content" name="content" onChange={getValue} defaultValue={Parser(element.content)}/>
              <button className="myButton" onClick={() => {
                updateReview(element.idx);
              }}>수정</button>
              <button className="myButton" onClick={() =>{
                deleteReview(element.idx);
              }}>삭제</button>
            </div>
          </div>
        )}
      </div>
      <div className='form-wrapper'>
        <input className="title-input" type='text' placeholder='제목' onChange={getValue} name='title'/>
        <CKEditor
          editor={ClassicEditor}
          data=""
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(_event, editor) => {
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