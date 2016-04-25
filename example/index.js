var React = require('react');
var ReactDOM = require('react-dom');
var ReactFileUpload = require('../src/ReactFileUpload');

var appElement = document.getElementById('example');

var App = React.createClass({

  getInitialState: function() {
    return {
      imgsrc: null,
    };
  },

  onDrop: function(file, e) {
    e.preventDefault();
    if (file[0].type.match(/^image/)) {
      console.log('Image found: ' + file[0].name);
      var reader = new FileReader();
      reader.onload = () => {
        this.setState({imgsrc: reader.result});
      };
      reader.readAsDataURL(file[0]);
    }
    else {
    }
  },

  showModal: function() {
    this.refs.upload.showModal();
  },

  render: function() {
    return (
      <div>
        ReactFileUpload Example<br />
        <button onClick={this.showModal}>FileUpload</button>
        <img width="800" src={this.state.imgsrc}></img>
        <ReactFileUpload
          classNameOfDropzone="dropzone"
          ref="upload"
          onDrop={this.onDrop}
          insideText="Choose or drag a file here."
        />
      </div>
    );
  }

});

ReactDOM.render(<App/>, appElement);
