import { useQuery } from "@tanstack/react-query";

import { initials, signedAvatarUrl } from "@/lib/members";

export function MemberAvatar({
  name,
  path,
  size = 40,
}: {
  name: string;
  path: string | null;
  size?: number;
}) {
  const { data: url } = useQuery({
    queryKey: ["avatar", path],
    queryFn: () => signedAvatarUrl(path),
    enabled: Boolean(path),
    staleTime: 30 * 60 * 1000,
  });

  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-accent-soft/50 font-sans text-xs font-medium text-primary ring-1 ring-border"
      style={{ width: size, height: size }}
    >
      {url ? (
        <img src={url} alt={name} className="h-full w-full object-cover" />
      ) : (
        initials(name || "R")
      )}
    </span>
  );
}
