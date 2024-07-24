import { PMDBError } from "@/api/pmdb-api";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { MdErrorOutline } from "react-icons/md";

type Props = {
  error: PMDBError | Error
}

export default function ErrorSnack({ error }: Props) {

  let message = "";
  if (error instanceof PMDBError) {
    message = error.friendlyMessage
  } else {
    message = error.message
  }

  console.error(error)

  return <Alert variant="destructive">

    <MdErrorOutline className="size-5" />
    <AlertTitle>Uh oh...</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
}
