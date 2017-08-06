import { NgModule } from '@angular/core';
import { PhoneCodesPipe } from './../pipes/phone-codes/phone-codes';
@NgModule({
	declarations: [PhoneCodesPipe],
	imports: [],
	exports: [PhoneCodesPipe]
})
export class PipesModule {
	static forRoot() {
	 return {
			 ngModule: PipesModule,
			 providers: [],
	 };
}
}
