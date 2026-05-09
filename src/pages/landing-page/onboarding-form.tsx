import { OnboardingValidationSchema } from "#/schema/validation";
import { Button } from "#/ui/components/button";
import { MyTextArea, MyTextField, PhoneTextField } from "#/ui/components/input";
import { cn } from "#/utils/style";
import { Formik } from "formik";

type OnboardingFormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  description: string;
  inquiry:string;
};

const initialOnboardingFormValues: OnboardingFormValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  description: "",
  inquiry:"",
  
};

const OnboardingForm = ({handleFormSubmit, isSubmitting }: { handleFormSubmit: (values: OnboardingFormValues) => void, isSubmitting: boolean }) => {

  return (
    <Formik initialValues={initialOnboardingFormValues} onSubmit={(values) => {
      handleFormSubmit(values);
      
    }} validationSchema={OnboardingValidationSchema}>
      {({ handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-center text-slate-900">Join Our Waitlist</h1>
                <p className="mb-4 text-center text-slate-900">Fill out the form below to join our waitlist and stay updated on our launch.</p>
            </div>

          <section className="w-full flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1 max-w-125">
                <MyTextField label="Full Name *" name="fullName" />
              </div>
              <div className="flex-1 max-w-125">
                <MyTextField label="Email *" name="email" />
              </div>
            </section>

            <section>
                
                <div className="w-full mb-4 max-w-125">
                  <PhoneTextField
                    name="phoneNumber"
                    label="Phone Number *"
                    defaultCountry="US"
                    withCountryCallingCode
                    setFieldValue={setFieldValue}
                    international={false}
                    // countrySelectProps={{ disabled: true }}
                    placeholder="(201) 555-0123"
                    cl
                  />
                </div>
            </section>

              <section className="w-full flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1 max-w-125">
                  <MyTextArea label="Description *" name="description" placeholder="Please tell us what your community is about." className="min-h-25 "/>
                </div>
              </section>
              <section className="w-full flex flex-col sm:flex-row gap-4 mb-4">
                
                <div className="flex-1 max-w-125">
                  <MyTextArea label="Do you have any questions or comments?" name="inquiry" className="min-h-25 "/>
                </div>
              </section>
                <section className="flex justify-center mt-6">

                <Button type="submit" className={cn("bg-slate-900 text-white text-lg font-semibold w-full max-w-[500px] py-2 md:py-3 h-auto px-4 rounded-md hover:bg-slate-800 transition-colors", { "opacity-50 cursor-not-allowed": isSubmitting })} disabled={isSubmitting}>Submit</Button>
                </section>
        </form>
      )}
    </Formik>
  );
}

export default OnboardingForm;