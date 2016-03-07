var React = require('react');
var ReactDOM = require('react-dom');
var FileUp = require('../components/ReactFileUpload');

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
        Hello<br />
        <button onClick={this.showModal}>FileUpload</button>
        <img src={this.state.imgsrc}></img>
        <FileUp
          ref="upload"
          onDrop={this.onDrop}
          placeholder="Choose or drag a file."
        />
      </div>
    );
  }

});

ReactDOM.render(<App/>, appElement);
