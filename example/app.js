var React = require('react');
var ReactDOM = require('react-dom');
var FileUpload = require('../components/ReactFileUpload');

var appElement = document.getElementById('example');

var App = React.createClass({

  getInitialState: function() {
    return {
      imgsrc: null,
      type: _Type[0],
    };
  },

  onDrop: function(file, e) {
    e.preventDefault();
    if (file[0].type.match(/^image/)) {
      console.log('Image found: ' + file[0].name);
      let reader = new FileReader();
      reader.onload = () => {
        this.setState({imgsrc: reader.result});
      };
      reader.readAsDataURL(file[0]);
    }
    else {
    }
  },

  render: function() {
    return (
      <div>
        <img src={this.state.imgsrc}></img>
        <FileUpload
          ref="fileUpload"
          onDrop={this.onDrop}
          placeholder="Choose or drag a file."
        />
      </div>
    );
  }

});

ReactDOM.render(<App/>, appElement);
