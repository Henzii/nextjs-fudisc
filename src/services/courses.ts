import { postWithToken } from "./util"
import { Course } from "@/types/courses"

type GetCourses = {
  count: number
  courses: Course[]
}

export const getCourses = async (limit: number, offset: number) => {
  const response = await postWithToken<'getCourses', GetCourses>(`
    query GetCourses($limit: Int!, $offset: Int!) {
        getCourses(limit: $limit, offset: $offset) {
          count
          courses {
            distance {
              string
              meters
            }
            id
            name
            layouts {
              name
              names
              par
              pars
              holes
              id
              deprecated
            }
          }
        }
      }
`, { limit, offset })
  if (!response) {
    return []
  }
  return response.data.getCourses.courses

}