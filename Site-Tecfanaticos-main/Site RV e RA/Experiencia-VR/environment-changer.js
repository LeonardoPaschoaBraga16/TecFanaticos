// Component to listen for environment menu clicks and notify state with an event.
AFRAME.registerComponent('environment-changer', {
    init: function () {
      this.el.addEventListener('click', (evt) => {
        this.el.sceneEl.emit('environmentSet', evt.target.getAttribute('text').value.toLowerCase());   
      });
    }
  });