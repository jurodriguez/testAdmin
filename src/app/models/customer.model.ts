import { EntityWithId } from './product.model';

export interface Customer extends EntityWithId {
  nombre: string;
  correo: string;
  fechaNacimiento: string;
}
