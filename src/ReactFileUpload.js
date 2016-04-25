var React = require('react');
var Dropzone = require('react-dropzone');
var Modal = require('react-modal');

var ReactFileUpload = React.createClass({
  getInitialState: function() {
    return {
      hidden: true
    };
  },

  getDefaultProps: function() {
    return {
      insideText: 'Choose or drag a file.'
    };
  },

  componentWillMount: function() {
  },

  componentDidMount: function() {
  },

  onDrop: function (files, e) {
    console.log('Received files: ', files[0].type);
    if (this.props.onDrop) {
      this.props.onDrop.call(this, files, e);
    }
    this.closeModal();
  },

  closeModal: function() {
      this.setState({
        hidden: true
      });
  },

  showModal: function() {
    this.setState({
      hidden: false
    });
  },

  render: function() {
    return(
        <div>
          <Modal
            closeTimeoutMS={150}
            isOpen={!this.state.hidden}
            onRequestClose={this.closeModal}
            >
              <span onClick={this.closeModal} className="button-close-modal">X</span>
              <Dropzone
                className={this.props.classNameOfDropzone}
                onDrop={this.onDrop}>
                  <div>{this.props.insideText}</div>
              </Dropzone>
          </Modal>
        </div>
      );
  }
});

module.exports = ReactFileUpload;
