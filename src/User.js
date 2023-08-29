export class User {
  constructor(information) {
    // Le constructeur de la classe User est appelé lorsqu'une nouvelle instance est créée.
    // Il prend les informations d'un utilisateur en tant que paramètre.

    // Stocke les informations passées en paramètre dans la propriété "information".
    this.information = information;

    // Initialise l'état de présence à "false".
    //je sais pas pourquoi ça fonctionne avec true
    this.present = true;

    // Appelle la méthode createHtml pour générer l'élément utilisateur.
    this.element = this.createHtml();

    // Définir l'attribut data-present en fonction de la valeur initiale de this.present.
    this.element.dataset.present = this.present;

    /*Comme mentionné ci-dessus, il va falloir gérer un click sur un élément utilisateur de telle sorte à ce que son état de présence 
s’inverse lorsque l’événement à lieu. Le plus simple est de stocker l’élément lors de la création de l’objet (constructor() ) 
et de lui ajouter un eventListener au même endroit. */
    //Gestion du click sur un élément utilisateur
    // Ajoute un écouteur d'événement "click" sur l'élément pour gérer le changement d'état de présence.

    // l'utilisation de bind(this) garantit que this dans la méthode togglePresence fait référence à l'instance correcte de la classe User, ce qui vous permet d'accéder aux propriétés et méthodes de cette instance comme prévu.
    //C'est une technique courante pour gérer les écouteurs d'événements tout en maintenant le contexte approprié pour les méthodes de classe.
    this.element.addEventListener("click", this.togglePresence.bind(this));
  }

  //méthode pour générer un élément HTML
  createHtml() {
    const containerElement = document.createElement("div");
    containerElement.classList.add("user");

    const childHtml = `
      <img src="${this.information.picture.large}">
      <div class="user--info">
          <h1>${this.information.name.title} ${this.information.name.first} ${this.information.name.last}</h1>
          <p>${this.information.dob.age} years old</p>
          <p>${this.information.location.city}</p>
      </div>
      <a href="mailto:${this.information.email}">
          <span class='mail'>✉️</span>
      </a>`;

    containerElement.insertAdjacentHTML("afterbegin", childHtml);

    return containerElement; // Retourne l'élément généré.
  }

  /*
### Méthode d’affichage des éléments utilisateurs

À ce stade-ci vous devriez pouvoir stocker les éléments correspondant à un profil utilisateur dans la propriété prévue à cet effet. Il faut cependant encore afficher cet élément sur la page elle-même. Créez donc une méthode permettant de faire cela. Un bon nom  pour cette méthode serait `render()`, mais vous pouvez évidemment l’appeler comme vous voulez. 
Au final, ces éléments devront impérativement être affichés comme enfants de l’élément `<main>` codé directement dans `index.html`
  */
  //méthode d'affichage visuel

  render() {
    const main = document.querySelector("main");
    main.insertAdjacentElement("afterbegin", this.element);
  }

  //méthode pour mettre à jour le compteur
  updateCounter() {
    // Sélectionnez l'élément de compteur dans le DOM
    const counterElement = document.querySelector(".counter");

    // Comptez le nombre d'utilisateurs présents en parcourant les éléments d'utilisateurs
    const presentUsers = document.querySelectorAll(
      ".user[data-present='true']"
    ).length;

    // Mettez à jour le texte du compteur avec le nombre d'utilisateurs présents
    counterElement.textContent = `${presentUsers}/20 people are here`;
  }

  /* Dans css : 
  main .user[data-present="true"] {
    background-color: #06d6a0;
    color: #ffffff;
  }
  
  main .user[data-present="true"] p {
    color: #ffffff;
  }
  */

  //méthode toggle pour dire si l'utilisateur est présent ou non, en se basant sur le css
  togglePresence() {
    //this.present = !this.present;
    //inverse l'état de présence
    this.present ? (this.present = false) : (this.present = true);
    //// Met à jour l'attribut "data-present" pour refléter le nouvel état de présence
    this.element.dataset.present = this.present;
    this.element.dataset.present = this.present;
    console.log(this.element.dataset.present);

    //pour le counter
    this.updateCounter();
  }
}
