import { toast } from "sonner";

export function toastInformation(title: string, description: string) {
  return toast(title, {
    description,
  });
}
