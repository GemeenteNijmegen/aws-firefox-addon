class ContainerURLLoader {

  // Define an enum for the supported container colors
  static Colors = Object.freeze({
    BLUE: "blue",
    TURQUOISE: "turquoise",
    GREEN: "green",
    YELLOW: "yellow",
    ORANGE: "orange",
    RED: "red",
    PINK: "pink",
    PURPLE: "purple",
    TOOLBAR: "toolbar"
  });

  constructor(containerName, color) {
    this.containerName = containerName;
    this.containerColor = this.mapColor(color);
  }

  mapColor(color) {
    // Use the enum to map user-defined colors to supported container colors
    switch (color) {
      case ContainerURLLoader.Colors.BLUE:
      case ContainerURLLoader.Colors.TURQUOISE:
      case ContainerURLLoader.Colors.GREEN:
      case ContainerURLLoader.Colors.YELLOW:
      case ContainerURLLoader.Colors.ORANGE:
      case ContainerURLLoader.Colors.RED:
      case ContainerURLLoader.Colors.PINK:
      case ContainerURLLoader.Colors.PURPLE:
      case ContainerURLLoader.Colors.TOOLBAR:
        return color;
      default:
        return ContainerURLLoader.Colors.BLUE;
    }
  }

  loadURL(url) {
    browser.contextualIdentities.query({ name: this.containerName }).then((identities) => {
      let identity = identities[0];
      if (!identity) {
        // Container does not exist, so ask the user if they want to create a new one
        const createContainer = confirm(`The container "${this.containerName}" does not exist. Would you like to create it?`);
        if (createContainer) {
          // Create new container
          browser.contextualIdentities.create({
            name: this.containerName,
            color: this.containerColor
          }).then((newIdentity) => {
            identity = newIdentity;
            // Open URL in the newly created container
            const openURL = confirm(`The container "${this.containerName}" has been created. Would you like to open the URL ${url} in this container?`);
            if (openURL) {
              browser.tabs.create({
                url: url,
                cookieStoreId: identity.cookieStoreId
              });
            } else {
              // User cancelled opening the URL, so do not open it
              return;
            }
          });
        } else {
          // User cancelled creation of new container, so do not open URL
          return;
        }
      } else {
        // Container already exists, so ask the user if they want to open the URL in this container
        const openURL = confirm(`The container "${this.containerName}" already exists. Would you like to open the URL ${url} in this container?`);
        if (openURL) {
          browser.tabs.create({
            url: url,
            cookieStoreId: identity.cookieStoreId
          });
        } else {
          // User cancelled opening the URL, so do not open it
          return;
        }
      }
    });
  }

}