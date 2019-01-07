import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getPropertiesQuery = gql`
  {
    properties {
      name
      type
      bedrooms
      guests
      price
    }
  }
`;

const ologin = gql`
  query ologin($email: String, $password: String) {
    ologin(email: $email, password: $password) {
      email
      password
      token
      name
      status
      message
      type
    }
  }
`;

const tlogin = gql`
  query tlogin($email: String, $password: String) {
    tlogin(email: $email, password: $password) {
      email
      password
      token
      name
      status
      message
      type
      city
    }
  }
`;

const property = gql`
  query property($name: String) {
    property(name: $name) {
      name
      propertydescription
      type
      bedrooms
      guests
      price
      location
    }
  }
`;

const userdetails = gql`
  query userdetails($name: String) {
    userdetails(name: $name) {
      name
      city
      country
      company
      school
      hometown
      languages
      gender
      about

      email
      password
      type
    }
  }
`;
const getmyPropsQuery = gql`
  query myproperties($customername: String) {
    myproperties(customername: $customername) {
      propertyname
      guests
      checkin
      price
      checkout
    }
  }
`;

const getOwnerProps = gql`
  query ownerproperties($ownername: String) {
    ownerproperties(ownername: $ownername) {
      name
      guests
      price
      checkin
      checkout
    }
  }
`;

export {
  getAuthorsQuery,
  getPropertiesQuery,
  ologin,
  tlogin,
  property,
  getmyPropsQuery,
  getOwnerProps,
  userdetails
};
