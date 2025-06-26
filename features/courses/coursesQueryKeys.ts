const coursesQueryKeys = Object.freeze({
  all: [{ scope: "courses" }] as const,
  page: () => [{ ...coursesQueryKeys.all[0] }] as const,
});

export default coursesQueryKeys;
