export type Department = (typeof Departments)[number];

export const Departments = [
  "security",
  "software",
  "business",
  "design",
] as const;

export const DepartmentNames = {
  security: "정보보호과",
  software: "소프트웨어과",
  business: "IT경영과",
  design: "콘텐츠디자인과",
};
