// import mysql from "./lib/DigiCertGlobalRootCA.crt.pem";
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MYSQL_HOST: "localhost",
    MYSQL_PORT: "3306",
    MYSQL_DATABASE: "next_demo_db",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "agicent",
  },
};

module.exports = nextConfig;
