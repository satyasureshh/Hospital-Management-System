import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  SnippetsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const a = ["Profile", "Appoinments", "Medical Records", "Log Out"];
const user = [
  UserOutlined,
  LaptopOutlined,
  SnippetsOutlined,
  LogoutOutlined,
].map((icon, index) => {
  const key = a[index];
  return {
    icon: React.createElement(icon),
    label: `${key}`,
    key: `${key.toLowerCase()}`,
  };
});

export const UserSideBar = user;

const b = ["Dashboard", "Add Doctor", "Doctors", "Users", "Log Out"];
const admin = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SnippetsOutlined,
  LogoutOutlined,
].map((icon, index) => {
  const key = b[index];
  return {
    icon: React.createElement(icon),
    label: `${key}`,
    key: `${key.toLowerCase()}`,
  };
});

export const AdminSideBar = admin;

const c = [
  "Profile",
  "Appoinments",
  "Announcements",
  "Medical Records",
  "Log Out",
];
const doctor = [
  LaptopOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SnippetsOutlined,
  LogoutOutlined,
].map((icon, index) => {
  const key = c[index];
  return {
    icon: React.createElement(icon),
    label: `${key}`,
    key: `${key.toLowerCase()}`,
  };
});

export const DoctorSideBar = doctor;
