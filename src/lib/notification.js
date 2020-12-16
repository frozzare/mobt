class Notification {
  constructor() {
    this.notification = null;
  }

  hasSupport() {
    return 'Notification' in window;
  }

  hasAccepted() {
    return this.hasSupport() && window.Notification.permission === 'granted';
  }

  askForPermission(callback) {
    if (!this.hasSupport()) {
      return;
    }

    window.Notification.requestPermission().then((response) => {
      if (typeof callback === 'function') {
        callback(response);
      }
    });
  }

  close() {
    if (this.notification) {
      this.notification.close();
    }
  }

  show(title, options = {}) {
    console.log(this.hasAccepted());
    if (!this.hasAccepted()) {
      return;
    }

    this.close();

    this.notification = new window.Notification(title, {
      tag: 'mobt-notification',
      silent: true,
      requireInteraction: true,
      ...options,
    });

    this.notification.onclick = () => {
      try {
        window.focus();
      } catch (e) {
        console.error(e);
      }
    };
  }
}

export const notification = new Notification();
