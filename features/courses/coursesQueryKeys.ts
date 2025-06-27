const coursesQueryKeys = Object.freeze({
  all: [{ scope: "courses" }] as const,
  page: (onlineState: boolean) =>
    [{ ...coursesQueryKeys.all[0], onlineState }] as const,
});

export default coursesQueryKeys;
