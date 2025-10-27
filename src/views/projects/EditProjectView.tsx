import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";
export const EditProjectView = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false, //Evita que reintente las consultas, para que no tarde tanto la carga de error
  });

  if (error) {
    console.log(error);
  }
  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data) return <EditProjectForm data={data} projectId={projectId}/>;
};
