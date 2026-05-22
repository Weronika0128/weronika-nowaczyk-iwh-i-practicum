require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const PRIVATE_APP_ACCESS_TOKEN = process.env.PRIVATE_APP_ACCESS_TOKEN;
const CUSTOM_OBJECT_TYPE_ID = process.env.CUSTOM_OBJECT_TYPE_ID;

if (!PRIVATE_APP_ACCESS_TOKEN) {
  throw new Error("Missing PRIVATE_APP_ACCESS_TOKEN in .env");
}
if (!CUSTOM_OBJECT_TYPE_ID) {
  throw new Error("Missing CUSTOM_OBJECT_TYPE_ID in .env");
}

const hubspot = axios.create({
  baseURL: "https://api.hubapi.com",
  headers: {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await hubspot.get(`/crm/v3/objects/${CUSTOM_OBJECT_TYPE_ID}`, {
      params: {
        properties: "name,species,bio",
        limit: 100,
        archived: false,
      },
    });

    res.render("homepage", {
      pageTitle: "Pets Table | Integrating With HubSpot I Practicum",
      pets: response.data.results,
    });
  } catch (error) {
    console.error("Error fetching custom object records:", error.response?.data || error.message);
    res.status(500).render("homepage", {
      pageTitle: "Pets Table | Integrating With HubSpot I Practicum",
      pets: [],
      errorMessage: "Unable to load custom object records from HubSpot.",
    });
  }
});

app.get("/update-cobj", (req, res) => {
  res.render("updates", {
    pageTitle: "Update Custom Object Form | Integrating With HubSpot I Practicum",
  });
});

app.post("/update-cobj", async (req, res) => {
  const { name, species, bio } = req.body;

  try {
    await hubspot.post(`/crm/v3/objects/${CUSTOM_OBJECT_TYPE_ID}`, {
      properties: {
        name,
        species,
        bio,
      },
    });
    res.redirect("/");
  } catch (error) {
    console.error("Error creating custom object record:", error.response?.data || error.message);
    res.status(500).render("updates", {
      pageTitle: "Update Custom Object Form | Integrating With HubSpot I Practicum",
      errorMessage: "Unable to create the custom object record in HubSpot.",
      formData: {
        name,
        species,
        bio,
      },
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});