type ActionState = undefined | { status: boolean; message: string };

export default async function action(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const email = formData.get("email") as string;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(email)) {
    return { status: false, message: "Invalid email address." };
  }

  return { status: true, message: `Message has been sent from ${email}` };
}
