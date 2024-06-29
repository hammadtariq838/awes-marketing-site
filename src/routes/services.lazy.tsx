import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/services')({
  component: ServicesPage,
})

function ServicesPage() {
  return <div>Services</div>
}