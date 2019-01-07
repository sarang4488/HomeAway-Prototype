import { gql } from "apollo-boost";

const addTravellerMutation = gql`
  mutation AddTraveller(
    $name: String
    $email: String
    $password: String
    $type: String
  ) {
    addTraveller(name: $name, email: $email, password: $password, type: $type) {
      name
    }
  }
`;

const addOwnerMutation = gql`
  mutation AddOwner(
    $name: String
    $email: String
    $password: String
    $type: String
  ) {
    addOwner(name: $name, email: $email, password: $password, type: $type) {
      name
      status
    }
  }
`;

const bookPropertyMutation = gql`
  mutation BookProperty(
    $checkin: Date
    $checkout: Date
    $guests: String
    $price: Int
    $customername: String
    $propertyname: String
    $description: String
  ) {
    bookProperty(
      customername: $customername
      propertyname: $propertyname
      description: $description
      checkin: $checkin
      checkout: $checkout
      guests: $guests
      price: $price
    ) {
      customername
      guests
      price
      description
      checkin
      checkout
    }
  }
`;

const userUpdateMutation = gql`
  mutation UserUpdate(
    $email: String
    $name: String
    $about: String
    $city: String
    $company: String
    $school: String
    $hometown: String
    $languages: String
    $gender: String
  ) {
    userUpdate(
      email: $email
      name: $name
      about: $about
      city: $city
      company: $company
      school: $school
      hometown: $hometown
      languages: $languages
      gender: $gender
    ) {
      name
      about
      city
      company
      school
      hometown
      languages
      gender
    }
  }
`;
export {
  bookPropertyMutation,
  addOwnerMutation,
  addTravellerMutation,
  userUpdateMutation
};
