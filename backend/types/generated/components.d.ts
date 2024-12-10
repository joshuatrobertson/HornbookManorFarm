import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCoursePackage extends Struct.ComponentSchema {
  collectionName: 'components_shared_course_packages';
  info: {
    displayName: 'CoursePackage';
  };
  attributes: {
    number_of_classes: Schema.Attribute.Integer;
    price: Schema.Attribute.Decimal;
  };
}

export interface SharedDates extends Struct.ComponentSchema {
  collectionName: 'components_shared_dates';
  info: {
    displayName: 'Dates';
    icon: 'calendar';
  };
  attributes: {
    date: Schema.Attribute.Date;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.course-package': SharedCoursePackage;
      'shared.dates': SharedDates;
    }
  }
}
