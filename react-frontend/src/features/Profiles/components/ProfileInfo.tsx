import InfoTable from "../../../common/InfoTable";
import { User } from "../../../models/user";
import { toFormattedDate } from "../../../utils/utils";

interface ProfileInfoProps {
  profile: User;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  return (
    <div className="row mx-0">
      <div className="col-lg-3 d-flex align-items-center">
        <div className="border p-3 rounded-3 shadow-sm">
          <h3 className="text-center mb-3">{profile.firstName}</h3>
          <img
            className="img-fluid w-100 rounded-3 mb-3"
            src={
              profile.photoUrl ||
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQArwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCBAcDAf/EADYQAAICAQIDAwsDAwUAAAAAAAABAgMEBREGIUExUbESEyIyUmFxgaHB0RRCkTNT4RVDY6Lw/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDqQANMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAed+RTjVuzIshXDvm9iP17Wa9JoXJTvn/Tr+79xQM7NyM+525djnPp3L4LoU1d7+K9Kqk4xnbZ74V8v5Zlj8U6VfJRlbOp/8kGl/Jz4A11mqyF0FZVKM4PslF7oyOY6ZqmVplvl4s9lv6UJerL5fc6DpOp06piq+nlJcp1vtgyDdAAAAAAAAAAAAAAAAAAA88i+GNRZfc/JhXFyk/cj0K/xrkOrSY0r/esSfwXPxApuoZtuoZdmTc35U3yj7K6JfA1h8QWJQAFAkdD1KWl58Lm35qXo2xXWO/27SOBFdaTT5xaa70fSK4YyXk6HjOT3lBOt+/bl4EqQAAAAAAAAAAAAAAAACq8e7+Yw308qXgi1Fd44pc9Lqt2/p2rf4NfnYKowALGQAFAAEVfOCt1ozb7POy2+hPkRwpS6dCo3Xr7z/l/glyAAAAAAAAAAAAAAAAAa2pYkc7AvxZPbzsGk/ZfR/wAo2QBya2udNs6rY+TOEnGS7mYl74j4f/1FvJxNo5SXpRfZYvyUjJptxrXVk1yqsX7ZrZ/5KPMADTA2MDEszsurFq9ax7b+yur+QwsPIzrfNYlUrZdfJ7F8WXzh/RIaTU5zanlTXpzXZFdy93iBKU1wpphVXyhXFRivcuRmAQAAAAAAAAAAAAAAAAAB1AHnfRTkVuGRVC2D6WRTX1NHP1zTsHeN+TF2f26/Sl/ghcjjOKk/02HJ9zsnt9EBLz4c0ifZhQiu6Eml4n2vh7Sa9n+irlt2ecbkvqytS4wz36tOOvkzKHGOdH1qMeXyaBq611wqgo1QjCC7IwikvoZFWxuMqZPbKxLIb9sq5eV9GTeBq2BnpLFyYSl1g/RkvkBvAddgAAAAAAAAAAAAAAADS1bUqdLxHfdzk+UIdZMDLUdQxtOx3dlWKK/alzcn3JFI1biPMz266m8eht+hF82veyP1DNv1DJlflT8qT7F0iu5e41gUABYgACgfU3Fprk116nwAWDSOKMnElGrN3yKd9vK/fH8l1xMqnMojfjWKdcuq8PicqN7SNUyNLyPOUveD/qVt8pL8mVdNBr4OZTn40MjHlvCX/V9zNgAAAAAAAAAAAMbLIVVysse0IreT7kc11rUrNUzpXSbVUeVUfZj+X2/Ms3G2e6cSvCrl6V3pWJeyuz+X4FKAIAFhQAFQAAAAAAwAJjhnVpabnKFsn+luaU1v6r6S/wDd50Jc+fgclOg8J57zdLULJb2478iXe10f2+RlU0AAAAAAAAAYzl5EJT9mLf0A5zxLk/qtayZ77xg/Nx+EeX5Iwysm7LJzfbKTbMSwAAVAAAAAAAAAAACe4MyfMas6m/Rvg47e9c19yBNzR7XTquJYulsfEiungPtYIAAAAAAeOY9sO9r2JeDAA5THsR9ALEAAUAAAAAAAAAAAPXFe2XQ1/cj4oADq3QAGVAAB/9k="
            }
          />
          <h4 className="text-center">{profile.roles?.[0] || "User"}</h4>
        </div>
      </div>
      <div className="col-lg-9 d-flex align-items-center">
        <InfoTable
          data={[
            ["DNI", profile.dni, "Phone", profile.officePhone],
            ["First Name", profile.firstName, "Last Name", profile.lastName],
            ["Address", profile.address, "Email", profile.email],
            [
              "Birthday",
              toFormattedDate(new Date(profile.dateOfBirth)),
              "Gender",
              profile.gender,
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
