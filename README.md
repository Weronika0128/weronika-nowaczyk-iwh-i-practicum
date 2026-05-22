# Integrating With HubSpot I: Foundations Practicum

This repository contains my submission for the **Integrating With HubSpot I: Foundations Practicum**.

The project is a Node.js application that uses Express, Axios, Pug, and the HubSpot CRM APIs to retrieve and create records for a HubSpot custom object.

## HubSpot Developer Test Account

**Custom object list view:**  
https://app.hubspot.com/contacts/148547521/objects/2-203058619/views/all/list

## Custom Object

The project uses a HubSpot custom object called **Pets**.

The custom object includes the following properties:

- `name` — Name
- `species` — Species
- `bio` — Bio

The custom object is associated with the Contacts object type.

The test account includes at least three Pets records:

- Luna
- Milo
- Kiwi

## Private App

A private app was created in the HubSpot developer test account with the required scopes:

- `crm.schemas.custom.read`
- `crm.schemas.custom.write`
- `crm.objects.custom.read`
- `crm.objects.custom.write`
- `crm.objects.contacts.read`
- `crm.objects.contacts.write`

The private app access token is stored locally in a `.env` file and is not committed to this repository.

## Routes

The application includes the three required routes:

- `GET /`  
  Retrieves Pets custom object records from HubSpot and renders them in an HTML table.

- `GET /update-cobj`  
  Renders a form for creating a new Pets custom object record.

- `POST /update-cobj`  
  Sends the submitted form data to HubSpot and creates a new Pets custom object record, then redirects back to the homepage.

## Views

The application includes the two required Pug templates:

- `views/homepage.pug`  
  Displays the Pets custom object records in a table.

- `views/updates.pug`  
  Displays the form used to create a new Pets custom object record.

The original `views/contacts.pug` file remains in the project for reference.

## Project Structure

```text
public/
  css/
    style.css
views/
  contacts.pug
  homepage.pug
  updates.pug
.gitignore
index.js
package.json
README.md
```