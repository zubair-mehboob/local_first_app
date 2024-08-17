import { Task } from "@/models/Task";
import { RealmProvider } from "@realm/react";
import { PropsWithChildren } from "react";

export default function RealmCustomProvider({ children }: PropsWithChildren) {
  return <RealmProvider schema={[Task]}>{children}</RealmProvider>;
}
