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
    transform             : 'translate(-50%, -50%)'
  }
};

var FileUp = React.createClass({
  getInitialState: function() {
    return {
      hidden: true
    };
  },

  getDefaultProps() {
    return {
      placeholder: 'Choose or drag a file.'
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
            isOpen={!this.state.hidden}
            onRequestClose={this.closeModal}
            style={customStyle}>
              <span onClick={this.closeModal} className="sprite button-close-modal" />
              <Dropzone className={this.props.className} onDrop={this.onDrop}>
                <div>
                  {this.props.placeholder}
                </div>
              </Dropzone>
          </Modal>
        </div>
      );
  }
});

module.exports = FileUp;
