import parsePhoneNumberFromString, { CountryCode } from "libphonenumber-js";

interface PhoneLink {
  phoneNumber: string;
  nationality?: CountryCode;
}

const PhoneLink = ({ phoneNumber, nationality = "DO" }: PhoneLink) => {
  return (
    <a href={`https://wa.me/${phoneNumber}`} target="_blank">
      {parsePhoneNumberFromString(
        phoneNumber,
        nationality
      )?.formatInternational() || "---"}
    </a>
  );
};

export default PhoneLink;
