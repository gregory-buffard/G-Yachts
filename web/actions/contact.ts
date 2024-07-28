"use server";

import { getClient } from "@/apollo";
import { gql } from "@apollo/client";
import { checkField } from "@/utils/contact";

export const legacy = async (
  formData: FormData,
  params: {
    prefix?: string;
    locale: string;
    page?: string;
  },
) => {
  if (formData.get("surname")) {
    const rawFormData = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      email: formData.get("email"),
    };
  }

  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    tel: params.prefix! + formData.get("tel"),
    message: formData.get("message"),
    inquiry: {
      buying: formData.get("buying") === "on",
      selling: formData.get("selling") === "on",
      chartering: formData.get("chartering") === "on",
      other: formData.get("other") === "on",
    },
    newsletter: formData.get("newsletter") === "on",
    status: "unclaimed",
  };

  /*
  const customer = await Customer.findOne({ email: rawFormData.email }).exec();
  if (customer) {
    customer.name = rawFormData.name;
    customer.email = rawFormData.email;
    customer.tel = rawFormData.tel;
    customer.message = rawFormData.message;
    customer.inquiry = rawFormData.inquiry;
    customer.newsletter = rawFormData.newsletter;
    customer.status = rawFormData.status;
    customer.save();
    return;
  }

  await Newsletter.findOneAndDelete({
    email: rawFormData.email,
  });
  await Customer.create(rawFormData);*/
};

export const newsletter = async (formData: FormData) => {
  // TODO: Need to connect MailChimp!
};

export const contact = async ({
  formData,
  params,
}: {
  formData: FormData;
  params: { locale: string; page: string; prefix?: string };
}) => {
  const client = getClient();
  const mutation = gql`
    mutation CreateMessage($data: mutationMessageInput!) {
      createMessage(data: $data) {
        id
        name
        email
        tel
        message
        page
        newsletter
        status
      }
    }
  `;

  const variables: {
    data: {
      name: string;
      email: string;
      message: string;
      page: string;
      status: "pending";
      tel?: string;
    };
  } = {
    data: {
      name: checkField(formData.get("name")),
      email: checkField(formData.get("email")),
      message: checkField(formData.get("message")),
      page: params.page,
      status: "pending",
    },
  };

  if (formData.get("tel") && params.prefix) {
    variables.data.tel = `${params.prefix} ${formData.get("tel")}`;
  }

  const { data } = await client.mutate({
    mutation,
    variables,
  });

  if (formData.get("newsletter") === "on") {
    await newsletter(formData);
  }

  return data.createMessage;
};
