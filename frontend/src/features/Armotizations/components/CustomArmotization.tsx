import useGenerateArmotization from "../hooks/useGenerateArmotization";
import ArmotizationDataTable from "./ArmotizationDataTable";
import ArmotizationForm from "./ArmotizationForm";

interface CustomArmotizationProps {
  setQuery: (query: string) => void;
}

/**
 * `CustomArmotization` is a UI component that allows users to generate and display
 * a custom loan amortization schedule based on user-defined form inputs.
 *
 * It renders:
 * - A form (`ArmotizationForm`) where users input custom amortization parameters
 * - A data table (`ArmotizationDataTable`) to display the generated schedule
 *
 * It uses the `useGenerateArmotization` hook to manage form state, handle changes,
 * and submit the form.
 *
 * When the form is submitted, the input values are serialized as a query string
 * and passed to the `setQuery` callback.
 *
 * @param {Object} props - Component props.
 * @param {(query: string) => void} props.setQuery - A callback function to update the query string
 *                                                    used for downloading the amortization as a CSV.
 *
 * @returns {JSX.Element} The rendered `CustomArmotization` component.
 *
 * @example
 * <CustomArmotization setQuery={(query) => setCsvQuery(query)} />
 */
const CustomArmotization = ({ setQuery }: CustomArmotizationProps) => {
  const { armotization, handleOnChange, handleOnSubmit, form } =
    useGenerateArmotization();

  return (
    <>
      <ArmotizationForm
        handleOnChange={handleOnChange}
        onSubmit={(e) => {
          setQuery(
            Object.keys(form)
              .map((k) => `${k}=${form[k as keyof typeof form]}`)
              .join("&")
          );
          handleOnSubmit(e);
        }}
      />
      <div>
        <ArmotizationDataTable armotization={armotization || []} />
      </div>
    </>
  );
};

export default CustomArmotization;
