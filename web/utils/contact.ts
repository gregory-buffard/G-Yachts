import { usePathname } from "@/navigation";

export const usePath = (): string => {
  const pathname = usePathname();
  switch (pathname) {
    case "/":
      return "Main Page";
    case "/sales":
      return "Sales Page";
    case "/sales/[id]":
      return "Yacht Page";
    case "/charters/[id]":
      return "Yacht for Charter Page";
    case "/charters":
      return "Charters Page";
    case "/new-constructions":
      return "New Constructions Page";
    case "/new-constructions/[id]":
      return "New Construction Page";
    case "/management":
      return "Management Page";
    case "/company":
      return "Company Page";
    case "/partners":
      return "Partners Page";
    case "/news":
      return "News Page";
    case "/news/[id]":
      return "News Article Page";
    case "/events":
      return "Events Page";
    case "/events/[id]":
      return "Event Page";
    case "/recruitment":
      return "Recruitment Page";
    case "/destinations":
      return "Destinations Page";
    case "/destinations/[id]":
      return "Destination Page";
    default:
      return "Unknown Page";
  }
};

export const checkField = (
  field: FormDataEntryValue | string | undefined | null,
): string => {
  if (typeof field === "string") {
    return field;
  }
  return "Unknown";
};
