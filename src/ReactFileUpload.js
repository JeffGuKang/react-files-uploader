var React = require('react');
var Dropzone = require('react-dropzone');
var Modal = require('react-modal');

const customStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '80%',
    height                 : '70%',
  }
};

var ModalFileUploder = React.createClass({
  getInitialState: function() {
    return {
      hidden: true
    };
  },

  getDefaultProps() {
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
    // this.setState({
    //   files: files
    // });
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
            style={customStyle}>
              <span onClick={this.closeModal} className="button-close-modal"></span>
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

module.exports = ModalFileUploder;
