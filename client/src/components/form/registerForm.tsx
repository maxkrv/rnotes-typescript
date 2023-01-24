import React, { ComponentPropsWithoutRef, FC } from "react";
import FormWrapper from "./formWrapper";

const RegisterForm: FC<ComponentPropsWithoutRef<"form">> = () => {
	return <FormWrapper formAction="register" />;
};

export default RegisterForm;
