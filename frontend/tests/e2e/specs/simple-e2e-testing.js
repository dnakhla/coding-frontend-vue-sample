// https://docs.cypress.io/api/introduction/api.html
/*
Search for Pokemon by text through use of a search bar.
Filter Pokemon by type using a dropdown.
Add and remove a Pokemon to and from your Favorites by clicking the heart icon.
Use tabs to switch between All Pokemon and Favorite Pokemon views.
Change the view from either a grid or list.
View Pokemon details using a /:name route.
Clicking on a Pokemon image or name should navigate to the above route to view the Pokemon details.
On the Pokemon details page, have a speaker icon that, when clicked, plays the sound of that Pokemon.
*/
describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });
});

describe("Home page", () => {
  it("checks the top tabs for change", () => {
    cy.visit("/");
    cy.contains("Favorites").click();
    cy.get(".card").each($el => {
      cy.get($el).should("have.class", "isFav");
    });
  });
});

describe("Home page", () => {
  it("checks the search", () => {
    cy.visit("/");
    cy.get("#namesearch")
      .type("Rattata")
      .should("have.value", "Rattata");
    cy.get("form").submit();
    cy.get(".card h2").should("have.text", "Rattata");
  });
});

describe("Home page", () => {
  it("checks the type dropdown", () => {
    cy.visit("/");
    cy.get("select")
      .select("Ice")
      .should("have.value", "Ice");
  });
});
describe("Home page", () => {
  it("checks the list View", () => {
    cy.visit("/");
    cy.contains("List").click();
  });
});
describe("Details page", () => {
  it("checks the details page", () => {
    cy.visit("/Cloyster");
    cy.get(".card a h2").should("have.text", "Cloyster");
  });
});

describe("Navigate from Details page to Home", () => {
  it("checks the details page", () => {
    cy.visit("/Cloyster");
    cy.get(".card a h2").should("have.text", "Cloyster");
    cy.get("div.gobacklink a div").click();
    cy.url().should("eq", Cypress.config().baseUrl);
  });
});
