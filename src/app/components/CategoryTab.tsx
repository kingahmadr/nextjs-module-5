"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CardsAllProducts from "./CardsAllProducts";
import CardsMensClothingProducts from "./CardMensClothingProducts";
import CardsJewelryProduct from "./CardsJewelryProduct";
import CardsWomensClothing from "./CardsWomenClothingProducts";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function CategoryTab() {
  const [value, setValue] = React.useState(0);
  // const theme = useTheme();
  // const handleChangeIndex = (index: number) => {
  //   setValue(index);
  // };
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "auto" }}>
      <AppBar position="static" sx={{ mt: "4.2rem" }}>
        <Tabs
          sx={{ bgcolor: "text.primary" }}
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="All Products" {...a11yProps(0)} />
          <Tab label="Jewelry" {...a11yProps(1)} />
          <Tab label="Mens Clothing" {...a11yProps(2)} />
          <Tab label="Womens Clothing" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CardsAllProducts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CardsJewelryProduct />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CardsMensClothingProducts />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CardsWomensClothing />
      </TabPanel>
    </Box>
  );
}
