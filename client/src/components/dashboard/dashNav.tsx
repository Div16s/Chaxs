import Link from "next/link";
import ProfileMenu from "../auth/profileMenu";

export default function DashNav({
  image,
  name,
}: {
  image?: string;
  name: string;
}) {
    return (
        <nav className="w-full border-b border-sky-200 bg-sky-50/60 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-90 transition"
            >
              <img
                src="/images/logo1.jpeg"
                alt="Chaxs Logo"
                className="h-10 w-full rounded-md object-cover"
              />
            </Link>

            <ProfileMenu name={name} image={image} />
          </div>
        </nav>
    )
}