import { User } from "./User.js";
let cleanArray = []; // Définir cleanArray en tant que variable globale

async function getusers() {
  const reponse = await fetch("https://randomuser.me/api/?results=20");
  const userArray = await reponse.json();
  //pour voir les données
  console.log(userArray);
  //on veut créer un tableau ne contenant que les informations essentielles
  //on voit dans le console.log que c'est dans results
  //const cleanArray = [];
  userArray.results.forEach((e) => {
    cleanArray.push({
      name: {
        title: e.name.title,
        first: e.name.first,
        last: e.name.last,
      },
      location: {
        city: e.location.city,
      },
      dob: {
        age: e.dob.age,
      },
      email: e.email,
      picture: {
        large: e.picture.large,
      },
    });
  });
  // trie par ordre alphabétique en arrivant sur la page
  ordreAlphabetique(cleanArray);
  sortByNameButton = document.getElementById("sort--name");
  sortByAgeButton = document.getElementById("sort--age");

  // Ajoutez l'écouteur d'événement pour le bouton "Sort by name"
  sortByNameButton.addEventListener("click", () => {
    sortByNameButton.classList.add("selected");
    sortByAgeButton.classList.remove("selected");
    ordreAlphabetique(cleanArray);
    updateMainContent(); // Mettez à jour le contenu de la section <main> avec le nouveau tri
  });

  // Ajoutez l'écouteur d'événement pour le bouton "Sort by age"
  sortByAgeButton.addEventListener("click", () => {
    sortByAgeButton.classList.add("selected");
    sortByNameButton.classList.remove("selected");
    ordreAge(cleanArray); // Appel de la fonction pour trier par ordre d'âge
    updateMainContent(); // Mettez à jour le contenu de la section <main> avec le nouveau tri
  });
  cleanArray.forEach((e) => {
    const user = new User(e);
    //pour rappel, render crée l'élément html
    user.render();
    user.togglePresence();
  });

  console.log(cleanArray);

  /*## BONUS - Changer l’ordre des profils 

Utilisez les éléments codés directement dans le fichier `index.html` pour changer l’ordre d’affichage de éléments: 

```html
<button id="sort--name" class="selected">Sort by name</button>
<button id="sort--age">Sort by age</button>
```

- Le bouton `sort—-name` doit afficher les éléments utilisateur par ordre A → Z du nom de famille
- Le bouton `sort—age` doit afficher les éléments utilisateur par ordre du plus jeune au plus âgé.

Tout le container `<main>` devra être mis à jour lors d’un click!

  */
  //méthode qui lorsqu'on clique sur le bouton sortbyname, ça trie par ordre alphabétique, et si on clique sur le bouton sortbyage, ça trie par ordre d'âge
}

getusers();

//function pour l'ordre alphabétique (appelée plus haut)
function ordreAlphabetique(array) {
  array.sort((a, b) => {
    if (a.name.last > b.name.last) return -1;
    else return 1;
  });

  // return array;
}
function ordreAge(array) {
  array.sort((a, b) => {
    if (a.dob.age > b.dob.age) return -1;
    else return 1;
  });
}
// Fonction pour mettre à jour le contenu de la section <main>
function updateMainContent() {
  const main = document.querySelector("main");
  // En effaçant le contenu actuel avant d'ajouter les nouveaux éléments, vous vous assurez que seuls les profils triés sont affichés, sans accumuler les anciens profils.
  main.innerHTML = ""; // Efface le contenu actuel

  cleanArray.forEach((e) => {
    const user = new User(e);

    user.render();
    user.togglePresence();
  });
}
