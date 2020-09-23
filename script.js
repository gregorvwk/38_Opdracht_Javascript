const landenLijst = document.getElementById("landen-lijst");
const lijst = document.getElementById("list");
const personsList = document.getElementById("person-list");
const creditCardbtn = document.getElementById("old-creditcard");
const landenTotaal = document.getElementById("Landen-number");
const gemiddeldeLeeftijdbtn = document.getElementById("landen-gemiddeld");

// landen Lijst

const addListToDOM = function (i) {
  const regionList = randomPersonData.map((array) => array.region);
  const aplaList = regionList.sort();
  const personList = aplaList[i];
  const liTag = document.createElement("li");
  lijst.appendChild(liTag).append(personList);
};
landenLijst.addEventListener("click", function () {
  lijst.innerHTML = "";
  for (i = 0; i < randomPersonData.length; i++) {
    addListToDOM(i);
  }
});

// personen lijst

const addListPersonDOM = function (i) {
  if (randomPersonData[i].gender == "female") {
    if (randomPersonData[i].age >= 30) {
      if (
        (randomPersonData[i].birthday.mdy.split("/", 1) == "12" &&
          randomPersonData[i].birthday.dmy.split("/", 1) >= "22") ||
        (randomPersonData[i].birthday.mdy.split("/", 1) == "01" &&
          randomPersonData[i].birthday.dmy.split("/", 1) <= "19")
      ) {
        const liTag = document.createElement("li");
        const imgTag = document.createElement("img");
        imgTag.src = "https://picsum.photos/200";
        liTag.innerHTML =
          randomPersonData[i].name + " " + randomPersonData[i].surname;
        lijst.appendChild(liTag).appendChild(imgTag);
      }
    }
  }
};

personsList.addEventListener("click", function () {
  lijst.innerHTML = "";
  for (i = 0; i < randomPersonData.length; i++) {
    addListPersonDOM(i);
  }
});

// Creditcards

const now = new Date().getFullYear();

const nowYear = now - "1999";

const addCreditcardsDOM = function (i) {
  const expiration = randomPersonData[i].credit_card.expiration.split("/");
  if (randomPersonData[i].age >= 18) {
    if (expiration[1] == now || expiration[1] == nowYear) {
      const liTag = document.createElement("li");
      const name = randomPersonData[i].name;
      const surname = randomPersonData[i].surname;
      const phone = randomPersonData[i].phone;
      const creditcardnumb = randomPersonData[i].credit_card.number;
      const cardExpiration = randomPersonData[i].credit_card.expiration;
      lijst
        .appendChild(liTag)
        .append(
          "Name: " +
            name +
            " " +
            surname +
            " Phone: " +
            phone +
            " Creditcard number: " +
            creditcardnumb +
            " expiration date: " +
            cardExpiration
        );
    }
  }
};

creditCardbtn.addEventListener("click", function () {
  lijst.innerHTML = "";
  for (i = 0; i < randomPersonData.length; i++) {
    addCreditcardsDOM(i);
  }
});

// landen totaal

const countOccurrences = function () {
  const regionList = randomPersonData.map((array) => array.region);
  const counter = regionList.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    []
  );
  const country = Object.entries(counter);
  for (i = 0; i < 36; i++) {
    const liTag = document.createElement("li");
    lijst.appendChild(liTag).append(country[i]);
  }
};
landenTotaal.addEventListener("click", function () {
  lijst.innerHTML = "";
  countOccurrences();
});

// gemiddele leeftijd buttons

gemiddeldeLeeftijdbtn.addEventListener("click", function () {
  lijst.innerHTML = "";
  const regionList = randomPersonData.map((array) => array.region);
  const country = Array.from(new Set(regionList));
  const ageCountry = randomPersonData.map((array) => [array.age, array.region]);
  console.log("Alle landen met leeftijden", ageCountry);
  console.log("Alle landen zonder dubbelen", country);
  for (i = 0; i < country.length; i++) {
    const buttonTag = document.createElement("button");
    const pTag = document.createElement("p");
    buttonTag.addEventListener("click", function () {
      pTag.innerHTML = "";
      let counter = 0;
      const list = ageCountry
        .map((array) => {
          if (array[1] == buttonTag.innerText) {
            counter++;
            return array[0];
          }
        })
        .filter((array) => array != undefined)
        .reduce((prev, curr) => prev + curr);
      console.log("Leeftijd totaal:", list);
      console.log("Aantal personen:", counter);
      const gemiddelde = list / counter;
      console.log("Gemiddelde:", gemiddelde);
      pTag.innerHTML = gemiddelde.toFixed(0);
    });
    buttonTag.innerHTML = country[i];
    const liTag = document.createElement("li");
    lijst.appendChild(liTag).appendChild(buttonTag).append(pTag);
  }
});

// Matching

const matchingbtn = document.getElementById("matching");

const omzetSterrenBeelden = function (
  dmy,
  mdy,
  maandStart,
  dagStart,
  maandEind,
  dagEind
) {
  if (
    (mdy.split("/", 1) == maandStart && dmy.split("/", 1) >= dagStart) ||
    (mdy.split("/", 1) == maandEind && dmy.split("/", 1) <= dagEind)
  ) {
    return true;
  }
};

const addPersonsToDOM = function () {
  console.log("check");
  const allPersons = randomPersonData.map((personLists) => {
      const liTag = document.createElement("li");
      const btnTag = document.createElement("button");
      const sterrenBeelden = function () {
        if (
          omzetSterrenBeelden(
            personLists.birthday.dmy,
            personLists.birthday.mdy,
            "12",
            "22",
            "01",
            "19"
          )
        ) {
          return "Steenbok";
        } else if (
          omzetSterrenBeelden(
            personLists.birthday.dmy,
            personLists.birthday.mdy,
            "01",
            "20",
            "02",
            "18"
          )
        ) {
          return "Waterman";
        } else if (
          omzetSterrenBeelden(
            personLists.birthday.dmy,
            personLists.birthday.mdy,
            "02",
            "19",
            "03",
            "20"
          )
        ) {
          return "Vissen";
        } else if (
          omzetSterrenBeelden(
            personLists.birthday.dmy,
            personLists.birthday.mdy,
            "03",
            "21",
            "04",
            "19"
          )
        ) {
          return "Ram";
        } else if (
          omzetSterrenBeelden(
            personLists.birthday.dmy,
            personLists.birthday.mdy,
            "04",
            "20",
            "05",
            "20"
          )
        ) {
          return "Stier";
        } else if (
          omzetSterrenBeelden(
            personLists.birthday.dmy,
            personLists.birthday.mdy,
            "05",
            "21",
            "06",
            "20"
          )
        ) {
          return "Tweeling";
        } else if (
          omzetSterrenBeelden(
            personLists.birthday.dmy,
            personLists.birthday.mdy,
            "06",
            "21",
            "07",
            "22"
          )
        ) {
          return "Kreeft";
        } else if (
          omzetSterrenBeelden(
            personLists.birthday.dmy,
            personLists.birthday.mdy,
            "07",
            "23",
            "08",
            "22"
          )
        ) {
          return "Leeuw";
        } else if (
          omzetSterrenBeelden(
            personLists.birthday.dmy,
            personLists.birthday.mdy,
            "08",
            "23",
            "09",
            "22"
          )
        ) {
          return "Maagd";
        } else if (
          omzetSterrenBeelden(
            personLists.birthday.dmy,
            personLists.birthday.mdy,
            "09",
            "23",
            "10",
            "22"
          )
        ) {
          return "Weegschaal";
        } else if (
          omzetSterrenBeelden(
            personLists.birthday.dmy,
            personLists.birthday.mdy,
            "10",
            "23",
            "11",
            "21"
          )
        ) {
          return "Schorpioen";
        } else if (
          omzetSterrenBeelden(
            personLists.birthday.dmy,
            personLists.birthday.mdy,
            "11",
            "22",
            "12",
            "21"
          )
        ) {
          return "Boogschutter";
        }
      };
      const personToDom = [
        "Name: " + personLists.name,
        " Surname: " + personLists.surname,
        " Country: " + personLists.region,
        " Age: " + personLists.age,
        " Starsign: " + sterrenBeelden(),
      ];
      btnTag.innerHTML = "Find match";
      liTag.className = sterrenBeelden();
      btnTag.className = personLists.name;
      console.log(personToDom);
      liTag.append(personToDom);
      liTag.append(btnTag);
      btnTag.addEventListener("click", function () {
        if (btnTag.className == personLists.name) {
          console.log(personToDom);
          console.log(personToDom[4]);
          const ulTag = document.createElement("ul");
          lijst.innerHTML = "";
          lijst.append(liTag);
          liTag.appendChild(ulTag);
          const starSign = allPersons
            .map((array) => {
              if (array.className == liTag.className) {
                return array;
              }
            })
            .filter((element) => element != undefined && element != liTag);
          for (i = 0; i < starSign.length; i++) {
            ulTag.append(starSign[i]);
            console.log(starSign[i]);
          }
        }
      });
      return liTag;
  });
  console.log(allPersons);
  allPersons.forEach((element) => {
    lijst.append(element);
  });
};

matchingbtn.addEventListener("click", function () {
  lijst.innerHTML = "";
  addPersonsToDOM();
});
