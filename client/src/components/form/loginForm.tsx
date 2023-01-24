import React, { ComponentPropsWithoutRef, FC } from "react";
import FormWrapper from "./formWrapper";

const LoginForm: FC<ComponentPropsWithoutRef<"form">> = () => {
	return <FormWrapper formAction="login" />;
};

export default LoginForm;
