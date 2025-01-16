"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { getUserDataSelect } from "@/lib/types";
import { updateUserProfileSchema, UpdateUserProfileValues } from "@/lib/zod";



export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validatedValues = updateUserProfileSchema.parse(values);

  const session= await auth();

  if (!session || !session.user?.id) throw new Error("Unauthorized");

  const updatedUser = await prisma.user.update({
    where: { id:session.user?.id},
    data: validatedValues,
    select: getUserDataSelect(session.user?.id),
  });

  return updatedUser;
}
